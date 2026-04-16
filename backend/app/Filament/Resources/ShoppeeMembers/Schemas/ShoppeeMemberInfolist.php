<?php

namespace App\Filament\Resources\ShoppeeMembers\Schemas;

use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Grid;
use Filament\Infolists\Components\TextEntry;
use Filament\Support\Enums\FontWeight;
use Filament\Support\Enums\IconPosition;

class ShoppeeMemberInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                // ── PERSONAL DETAILS ────────────────────────────────────
                Section::make('Personal Details')
                    ->icon('heroicon-m-user-circle')
                    ->collapsible()
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextEntry::make('fullname')
                                    ->label('Full Name')
                                    ->weight(FontWeight::Bold)
                                    ->color('primary'),

                                TextEntry::make('member_id')
                                    ->label('Member ID')
                                    ->icon('heroicon-m-identification')
                                    ->iconPosition(IconPosition::Before)
                                    ->copyable()
                                    ->copyMessage('Member ID copied!')
                                    ->copyMessageDuration(1500),

                                TextEntry::make('email')
                                    ->label('Email Address')
                                    ->icon('heroicon-m-envelope')
                                    ->iconPosition(IconPosition::Before)
                                    ->copyable()
                                    ->copyMessage('Email copied!')
                                    ->copyMessageDuration(1500),

                                TextEntry::make('mobile_no')
                                    ->label('Mobile Number')
                                    ->icon('heroicon-m-phone')
                                    ->iconPosition(IconPosition::Before)
                                    ->copyable()
                                    ->copyMessage('Number copied!')
                                    ->copyMessageDuration(1500),

                                TextEntry::make('dob')
                                    ->label('Date of Birth')
                                    ->icon('heroicon-m-cake')
                                    ->iconPosition(IconPosition::Before)
                                    ->date('d M, Y'),

                                TextEntry::make('branch_name')
                                    ->label('Branch')
                                    ->badge()
                                    ->color('success'),
                            ]),
                    ]),

                // ── BANK / TAX DETAILS ───────────────────────────────────
                Section::make('Bank Details')
                    ->icon('heroicon-m-building-library')
                    ->collapsible()
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextEntry::make('branch_pan')
                                    ->label('PAN Number')
                                    ->icon('heroicon-m-finger-print')
                                    ->iconPosition(IconPosition::Before)
                                    ->copyable()
                                    ->copyMessage('PAN copied!')
                                    ->copyMessageDuration(1500),

                                TextEntry::make('gst_no')
                                    ->label('GST Number')
                                    ->icon('heroicon-m-receipt-percent')
                                    ->iconPosition(IconPosition::Before)
                                    ->copyable()
                                    ->copyMessage('GST copied!')
                                    ->copyMessageDuration(1500),
                            ]),
                    ]),

                // ── ADDRESS ──────────────────────────────────────────────
                Section::make('Address Details')
                    ->icon('heroicon-m-map-pin')
                    ->collapsible()
                    ->schema([
                        TextEntry::make('address')
                            ->label('Full Address')
                            ->icon('heroicon-m-home')
                            ->iconPosition(IconPosition::Before)
                            ->columnSpanFull(),

                        Grid::make(4)
                            ->schema([
                                TextEntry::make('city')
                                    ->label('City')
                                    ->badge()
                                    ->color('info'),

                                TextEntry::make('district')
                                    ->label('District')
                                    ->badge()
                                    ->color('info'),

                                TextEntry::make('state')
                                    ->label('State')
                                    ->badge()
                                    ->color('info'),

                                TextEntry::make('pin_code')
                                    ->label('Pin Code')
                                    ->badge()
                                    ->color('gray'),
                            ]),
                    ]),

            ]);
    }
}