<?php

namespace App\Filament\Resources\ShoppeeMembers\Tables;

use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;

class ShoppeeMembersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([

                Tables\Columns\TextColumn::make('id')
                    ->sortable(),

                Tables\Columns\TextColumn::make('member_id')
                    ->searchable(),

                Tables\Columns\TextColumn::make('fullname')
                    ->searchable(),

                // 🔥 Branch with badge color
                Tables\Columns\TextColumn::make('branch_name')
                    ->badge()
                    ->color(fn($state) => str_contains($state, 'Bharuch') ? 'success' : 'warning'),

                Tables\Columns\TextColumn::make('branch_pan'),

                Tables\Columns\TextColumn::make('dob')
                    ->date(),

                Tables\Columns\TextColumn::make('gst_no')->toggleable(),
                Tables\Columns\TextColumn::make('address')->toggleable(),

                Tables\Columns\TextColumn::make('email'),

                Tables\Columns\TextColumn::make('mobile_no'),



                Tables\Columns\TextColumn::make('pin_code'),

                Tables\Columns\TextColumn::make('state'),

                Tables\Columns\TextColumn::make('city'),

                Tables\Columns\TextColumn::make('district'),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime(),

                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime(),
            ])

            ->filters([
                //
            ])

            ->recordActions([
                ViewAction::make()
                    ->url(fn($record) => route(
                        'filament.admin.resources.shoppee-members.view',
                        $record
                    )),
            ])

            ->toolbarActions([
                // Tables\Actions\CreateAction::make(),
            ]);

    }
}