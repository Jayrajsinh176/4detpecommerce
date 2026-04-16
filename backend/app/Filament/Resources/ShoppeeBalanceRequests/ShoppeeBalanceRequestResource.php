<?php

namespace App\Filament\Resources\ShoppeeBalanceRequests;

use App\Filament\Resources\ShoppeeBalanceRequests\Pages\EditShoppeeBalanceRequest;
use App\Filament\Resources\ShoppeeBalanceRequests\Pages\ListShoppeeBalanceRequests;
use App\Models\Shoppee_BalanceRequest;
use BackedEnum;
use UnitEnum;
use Filament\Resources\Resource;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Filament\Schemas\Schema;

class ShoppeeBalanceRequestResource extends Resource
{
    protected static ?string $model = Shoppee_BalanceRequest::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedBanknotes;

    // ✅ Dropdown Group
   protected static string|UnitEnum|null $navigationGroup = 'Shoppe Panel';
    protected static ?string $navigationLabel = 'Balance Requests';
    protected static ?string $pluralLabel = 'Balance Requests';
protected static ?int $navigationSort = 5;

    // ❌ Disable Create
    public static function canCreate(): bool
    {
        return false;
    }

    public static function form(Schema $schema): Schema
    {
        return \App\Filament\Resources\ShoppeeBalanceRequests\Schemas\ShoppeeBalanceRequestForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return \App\Filament\Resources\ShoppeeBalanceRequests\Tables\ShoppeeBalanceRequestsTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListShoppeeBalanceRequests::route('/'),
            'edit' => EditShoppeeBalanceRequest::route('/{record}/edit'),
        ];
    }
}